#! /usr/bin/env node
const { program } = require("commander");
const process = require("process");
const path = require("path");
const fs = require("fs");

const cwd = process.cwd();
const packageJson = require(`${cwd}/package.json`);

program
  .requiredOption("--target-esm <path>", "ESM distribution folder")
  .requiredOption("--target-cjs <path>", "CJS distribution folder");

program.parse();

const options = program.opts();

if (!options.targetEsm || !options.targetCjs) {
  program.help();
}

if (!fs.existsSync(options.targetEsm)) {
  program.error(`ESM distribution folder ${options.targetEsm} does not exist`);
}

if (!fs.existsSync(options.targetCjs)) {
  program.error(`CJS distribution folder ${options.targetCjs} does not exist`);
}

const esmPackageJson = {
  ...packageJson,
  type: "module",
};

const cjsPackageJson = {
  ...packageJson,
  type: "commonjs",
};

const esmPackageJsonPath = path.join(cwd, options.targetEsm, "package.json");
const cjsPackageJsonPath = path.join(cwd, options.targetCjs, "package.json");

fs.writeFileSync(esmPackageJsonPath, JSON.stringify(esmPackageJson));
fs.writeFileSync(cjsPackageJsonPath, JSON.stringify(cjsPackageJson));

process.exit(0);
