#!/usr/bin/env node
var fs = require('fs');
var path = require('path');

const dtsFile = path.resolve(`bin/pixi-particles.d.ts`);
let dtsContent = fs.readFileSync(dtsFile, 'utf8');
dtsContent = dtsContent.replace(/namespace pixiparticles/g, 'module PIXI.particles');
fs.writeFileSync(dtsFile, dtsContent, 'utf8');
