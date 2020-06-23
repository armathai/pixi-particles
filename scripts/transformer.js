#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const util = require('util');
let lineReader = require('line-reader');
lineReader.open = util.promisify(lineReader.open, lineReader);

const SpawnShape = {
    point: 0,
    line: 1,
    square: 2,
    ellipse: 3,
};

const SpriteMode = {
    single: 0,
    random: 1,
    animated: 2,
};

const input = path.resolve(`particle-park`);
const output = path.resolve(`src/__examples__/assets/effects`);

const readString = line => {
    const keyValue = line.split(':');
    keyValue[1] = keyValue[1].trim();
    return keyValue;
};

const readBoolean = line => {
    const keyValue = readString(line);
    keyValue[1] = keyValue[1] === 'true';
    return keyValue;
};

const readNumber = line => {
    const keyValue = readString(line);
    keyValue[1] = parseFloat(keyValue[1]);
    return keyValue;
};

const readValue = async (obj, reader) => {
    const line = await reader.nextLine();
    const keyValue = readBoolean(line);
    obj[keyValue[0]] = keyValue[1];
    return obj;
};

const readRangedNumericValueValue = async (obj, reader) => {
    let line = await reader.nextLine();
    let keyValue = readNumber(line);
    obj[keyValue[0]] = keyValue[1];
    line = await reader.nextLine();
    keyValue = readNumber(line);
    obj[keyValue[0]] = keyValue[1];
    return obj;
};

const readScaledNumericValue = async (obj, reader) => {
    let line = await reader.nextLine();
    let keyValue = readNumber(line);
    obj[keyValue[0]] = keyValue[1];
    line = await reader.nextLine();
    keyValue = readNumber(line);
    obj[keyValue[0]] = keyValue[1];
    line = await reader.nextLine();
    keyValue = readBoolean(line);
    obj[keyValue[0]] = keyValue[1];
    line = await reader.nextLine();
    keyValue = readNumber(line);
    const scalingCount = keyValue[1];
    obj[keyValue[0]] = scalingCount;
    for (let i = 0; i < scalingCount; i++) {
        line = await reader.nextLine();
        keyValue = readNumber(line);
        obj[keyValue[0]] = keyValue[1];
    }
    line = await reader.nextLine();
    keyValue = readNumber(line);
    const timelineCount = keyValue[1];
    obj[keyValue[0]] = timelineCount;
    for (let i = 0; i < timelineCount; i++) {
        line = await reader.nextLine();
        keyValue = readNumber(line);
        obj[keyValue[0]] = keyValue[1];
    }
    return obj;
};

const readIndependentScaledNumericValue = async (obj, reader) => {
    let line = await reader.nextLine();
    let keyValue = readBoolean(line);
    obj[keyValue[0]] = keyValue[1];
    return obj;
};

const readDelay = async reader => {
    await reader.nextLine();
    const obj = await readValue({}, reader);
    if (!obj.active) {
        return obj;
    }
    return await readRangedNumericValueValue(obj, reader);
};

const readDuration = async reader => {
    await reader.nextLine();
    return await readRangedNumericValueValue({}, reader);
};

const readCount = async reader => {
    await reader.nextLine();
    const obj = {};
    let line = await reader.nextLine();
    let keyValue = readNumber(line);
    obj[keyValue[0]] = keyValue[1];
    line = await reader.nextLine();
    keyValue = readNumber(line);
    obj[keyValue[0]] = keyValue[1];
    return obj;
};

const readEmission = async reader => {
    await reader.nextLine();
    return await readScaledNumericValue(await readRangedNumericValueValue({}, reader), reader);
};

const readLife = async reader => {
    await reader.nextLine();
    const obj = await readIndependentScaledNumericValue(
        await readScaledNumericValue(await readRangedNumericValueValue({}, reader), reader),
        reader,
    );
    await reader.nextLine();
    obj.offset = await readValue({}, reader);
    if (!obj.offset.active) {
        obj.offset = await readIndependentScaledNumericValue(obj.offset, reader);
        return obj;
    }
    obj.offset = await readIndependentScaledNumericValue(
        await readScaledNumericValue(await readRangedNumericValueValue({}, reader), reader),
        reader,
    );
    return obj;
};

const readOffset = async reader => {
    const obj = {};
    await reader.nextLine();
    obj.x = await readValue({}, reader);
    if (obj.x.active) {
        obj.x = await readScaledNumericValue(await readRangedNumericValueValue(obj.x, reader), reader);
    }
    await reader.nextLine();
    obj.y = await readValue({}, reader);
    if (obj.y.active) {
        obj.y = await readScaledNumericValue(await readRangedNumericValueValue(obj.y, reader), reader);
    }
    return obj;
};

const readSpawn = async reader => {
    const obj = {};
    await reader.nextLine();
    const line = await reader.nextLine();
    const keyValue = readString(line);
    obj[keyValue[0]] = SpawnShape[keyValue[1]];
    await reader.nextLine();
    obj.width = await readScaledNumericValue(await readRangedNumericValueValue({}, reader), reader);
    await reader.nextLine();
    obj.height = await readScaledNumericValue(await readRangedNumericValueValue({}, reader), reader);
    return obj;
};

const readScale = async reader => {
    const obj = {};
    await reader.nextLine();
    obj.x = await readScaledNumericValue(await readRangedNumericValueValue({}, reader), reader);
    await reader.nextLine();
    obj.y = await readValue({}, reader);
    if (obj.y.active) {
        obj.y = await readScaledNumericValue(await readRangedNumericValueValue(obj.y, reader), reader);
    }
    return obj;
};

const readVelocity = async reader => {
    await reader.nextLine();
    let obj = await readValue({}, reader);
    if (!obj.active) {
        return obj;
    }
    obj = await readScaledNumericValue(await readRangedNumericValueValue(obj, reader), reader);
    obj['lowMin'] /= 1000;
    obj['lowMax'] /= 1000;
    obj['highMin'] /= 1000;
    obj['highMax'] /= 1000;
    return obj;
};

const readAngle = async reader => {
    await reader.nextLine();
    const obj = await readValue({}, reader);
    if (!obj.active) {
        return obj;
    }
    return await readScaledNumericValue(await readRangedNumericValueValue(obj, reader), reader);
};

const readRotation = async reader => {
    await reader.nextLine();
    let obj = await readValue({}, reader);
    if (!obj.active) {
        return obj;
    }
    obj = await readScaledNumericValue(await readRangedNumericValueValue(obj, reader), reader);
    obj['lowMin'] *= -1;
    obj['lowMax'] *= -1;
    obj['highMin'] *= -1;
    obj['highMax'] *= -1;
    return obj;
};

const readWind = async reader => {
    await reader.nextLine();
    let obj = await readValue({}, reader);
    if (!obj.active) {
        return obj;
    }
    obj = await readScaledNumericValue(await readRangedNumericValueValue(obj, reader), reader);
    obj['lowMin'] /= 1000;
    obj['lowMax'] /= 1000;
    obj['highMin'] /= 1000;
    obj['highMax'] /= 1000;
    return obj;
};

const readGravity = async reader => {
    await reader.nextLine();
    let obj = await readValue({}, reader);
    if (!obj.active) {
        return obj;
    }
    obj = await readScaledNumericValue(await readRangedNumericValueValue(obj, reader), reader);
    obj['lowMin'] /= 1000;
    obj['lowMax'] /= 1000;
    obj['highMin'] /= 1000;
    obj['highMax'] /= 1000;
    return obj;
};

const readTint = async reader => {
    await reader.nextLine();
    const obj = {};
    let line = await reader.nextLine();
    let keyValue = readNumber(line);
    const colorsCount = keyValue[1];
    obj[keyValue[0]] = colorsCount;
    for (let i = 0; i < colorsCount; i++) {
        line = await reader.nextLine();
        keyValue = readNumber(line);
        obj[keyValue[0]] = keyValue[1];
    }
    line = await reader.nextLine();
    keyValue = readNumber(line);
    const timelineCount = keyValue[1];
    obj[keyValue[0]] = timelineCount;
    for (let i = 0; i < timelineCount; i++) {
        line = await reader.nextLine();
        keyValue = readNumber(line);
        obj[keyValue[0]] = keyValue[1];
    }
    return obj;
};

const readTransparency = async reader => {
    await reader.nextLine();
    return await readScaledNumericValue(await readRangedNumericValueValue({}, reader), reader);
};

const readOptions = async reader => {
    await reader.nextLine();
    const obj = {};
    let line = await reader.nextLine();
    let keyValue = readBoolean(line);
    obj[keyValue[0]] = keyValue[1];
    line = await reader.nextLine();
    keyValue = readBoolean(line);
    obj[keyValue[0]] = keyValue[1];
    line = await reader.nextLine();
    keyValue = readBoolean(line);
    obj[keyValue[0]] = keyValue[1];
    line = await reader.nextLine();
    keyValue = readBoolean(line);
    obj[keyValue[0]] = keyValue[1];
    line = await reader.nextLine();
    keyValue = readBoolean(line);
    obj[keyValue[0]] = keyValue[1];
    line = await reader.nextLine();
    keyValue = readBoolean(line);
    obj[keyValue[0]] = keyValue[1];
    line = await reader.nextLine();
    keyValue = readString(line);
    obj[keyValue[0]] = SpriteMode[keyValue[1]];
    return obj;
};

const readTextures = async reader => {
    await reader.nextLine();
    const obj = [];
    let line = '';
    do {
        line = await reader.nextLine();
        line = line.replace(/^.*[\\\/]/, '');
        if (line.length === 0 || !line.trim()) {
            break;
        }
        obj.push(line);
    } while (true);

    return obj;
};

async function execute(params) {
    const inputDirs = fs
        .readdirSync(input, { withFileTypes: true })
        .filter(dir => dir.isDirectory())
        .map(dir => dir.name);
    inputDirs.forEach(async dir => {
        const inputFiles = fs.readdirSync(path.join(input, dir));
        const p = inputFiles.find(f => f.split('.').pop() === 'p');
        const reader = await lineReader.open(path.join(input, dir, p));
        reader.nextLine = util.promisify(reader.nextLine, lineReader);
        const effect = {};
        do {
            const emitter = {};
            let name = await reader.nextLine();
            while (Object.prototype.hasOwnProperty.call(effect, name)) {
                let index = name[name.length - 1];
                index = parseInt(index);
                if (Number.isNaN(index)) {
                    name = `${name.substring(0, name.length)}${1}`;
                } else {
                    name = `${name.substring(0, name.length - 1)}${++index}`;
                }
            }
            effect[name] = emitter;
            emitter.delay = await readDelay(reader);
            emitter.duration = await readDuration(reader);
            emitter.count = await readCount(reader);
            emitter.emission = await readEmission(reader);
            emitter.life = await readLife(reader);
            emitter.offset = await readOffset(reader);
            emitter.spawn = await readSpawn(reader);
            emitter.scale = await readScale(reader);
            emitter.velocity = await readVelocity(reader);
            emitter.angle = await readAngle(reader);
            emitter.rotation = await readRotation(reader);
            emitter.wind = await readWind(reader);
            emitter.gravity = await readGravity(reader);
            emitter.tint = await readTint(reader);
            emitter.transparency = await readTransparency(reader);
            emitter.options = await readOptions(reader);
            emitter.textures = await readTextures(reader);
            if (!reader.hasNextLine()) {
                break;
            }
            await reader.nextLine();
        } while (true);
        fs.writeFileSync(path.join(output, `${dir}.json`), JSON.stringify(effect));
    });
}

execute();
