#!/usr/bin/env node
import fs from 'node:fs'
import prompts from 'prompts'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
const cwd = process.cwd()

const utils = [
    { title: "Scripts", value: "utils/scripts" },
    { title: "Styles", value: "utils/styles" },
    { title: "Third Party", value: "utils/third-party" },
]
const templates = [
    { title: "Vue2 + Vite (Legacy) + MPA (with Vant v2)", value: "templates/frontend/vite-legacy-mpa" }
]
function copy(src, dest) {
    const stat = fs.statSync(src)
    if (stat.isDirectory()) {
        copyDir(src, dest)
    } else {
        fs.copyFileSync(src, dest)
    }
}
function copyDir(srcDir, destDir, overwrite = false) {
    fs.mkdirSync(destDir, { recursive: true })
    for (const file of fs.readdirSync(srcDir)) {
        const srcFile = path.resolve(srcDir, file)
        const destFile = path.resolve(destDir, file)
        copy(srcFile, destFile)
    }
}

async function init() {
    try {
        let result = await prompts(
            [
                {
                    type: "text",
                    name: "target_dir",
                    message: "Type your folder name (empty for current dir): "
                },
                {
                    type: "confirm",
                    name: "overwrite",
                    message: "Overwrite if file exist?",
                    initial: false
                },
                {
                    type: "select",
                    name: "type",
                    message: "Which type to create using CLI?",
                    choices: [
                        { title: "Templates", value: "templates" },
                        { title: "Common Styles/Scripts/Tools", value: "utils" },
                    ]
                },
                {
                    type: prev => prev === "utils" ? "multiselect" : "select",
                    name: "module",
                    message: "Select module(s) that you want to clone",
                    choices: prev => prev === "utils" ? utils : templates
                },
                {
                    type: "confirm",
                    name: "last_confirm",
                    message: "Everything already, confirm to continue!",
                    initial: true
                }
            ]
        )

        /**
         * {
         *   target_dir: '',
         *   type: 'templates',
         *   module: 'templates/frontend/vite-legacy-mpa',
         *   overwrite: true,
         *   last_confirm: true
         * }
         */
        const { target_dir, type, module, overwrite, last_confirm } = result
        if (!last_confirm) return;
        const root = path.join(cwd, target_dir);
        const write = (file, content = "") => {
            const targetPath = path.join(root, file)
            if (content) {
                fs.writeFileSync(targetPath, content)
            } else {
                copy(path.join(templateDir, file), targetPath)
            }
        }
        if (!fs.existsSync(root)) {
            fs.mkdirSync(root, { recursive: true });
        }
        let templateDir;
        if (type === "utils") {
            console.log("Not supported yet...");
            return;
        } else {
            templateDir = path.resolve(
                fileURLToPath(import.meta.url),
                '../..',
                module,
            )
        }

        if (type === "templates") {
            let files = fs.readdirSync(templateDir);
            for (const file of files.filter((f) => f !== 'package.json')) {
                write(file)
            }
            const pkg = JSON.parse(
                fs.readFileSync(path.join(templateDir, `package.json`), 'utf-8'),
            )
            pkg.name = target_dir || "unamed-project"
            write('package.json', JSON.stringify(pkg, null, 2) + '\n')
        } else {
            console.log("Not supported yet...");
            return;
        }
    } catch (e) {
        console.log(e)
    }
}

init()