const {
  items,
  expItems, // 战斗记录
  potentialItems // 潜能信物
} = require('./original/item_table.json');

const path = require('path');
const fs = require('fs-extra');
const { writeFile } = require('./util/write');
const _ = require('underscore');

const DropLevels = {
  'ALWAYS': 1, // 固定
  'ALMOST': 2, // 大概率
  'USUAL': 3, // 概率
  'OFTEN': 4, // 小概率 2
  'SOMETIMES': 5, // 罕见 3
  'NONE': 6
};

function parseFormulas() {
  const allFormulas = [];
  const { manufactFormulas, workshopFormulas } = require('./original/building_data.json');

  function innerForEach(formula) {
    delete formula.extraOutcomeRate;
    delete formula.extraOutcomeGroup;
    delete formula.formulaType;
    delete formula.buffType;
    delete formula.requireStages;

    const { itemId, requireRooms } = formula;
    const room = requireRooms[0];
    if (room) {
      formula.roomType = room.roomId;
      delete formula.requireRooms;
    }

    const item = itemArr.filter(item => item.itemId === itemId)[0];
    if (item) {
      formula.item = item.name; // 这个名字就是自己看的 其实没用
    }

    allFormulas.push(formula);
  }

  Object
    .keys(manufactFormulas)
    .forEach(key => {
      const formula = manufactFormulas[key];
      innerForEach(formula);
    });

  Object
    .keys(workshopFormulas)
    .forEach(key => {
      const formula = workshopFormulas[key];
      innerForEach(formula);
    });

  return allFormulas;
}

function parseStages() {
  const { stages } = require('./original/stage_table.json');
  return Object
    .keys(stages)
    .filter(id => id.indexOf('a001_') < 0)
    .map(key => {
      const stage = stages[key];
      const { stageId, name, code, apCost, expGain, goldGain, stageDropInfo } = stage;
      let { displayRewards = [] } = stageDropInfo;
      if (displayRewards == null) {
        displayRewards = [];
      }

      const drops = displayRewards
        // .filter(re => isValidItemId(re.id))
        .map(reward => {
          const item = itemArr.filter(item => item.itemId === reward.id)[0];
          if (item) {
            reward.name = item.name;
          }

          return reward;
        });

      return {
        id: stageId,
        name,
        code,
        apCost, // 理智消耗
        expGain,
        goldGain,
        drops
      };
    });
}

function isValidSortId(sortId = -1) {
  return sortId > 0 && sortId < 120;
}

function isValidItemId(itemId) {
  const invalidIds = [
    // '4001', // 龙门币
    '4002', // 源石
    '4003',
    '3141',
    '4004',
    '4005',
    '4006',
    '7004',
    '7003',
    '7001',
    '7002',
    '3401',
    '3105', // 龙骨
    // '3003',
    // '3133',
    // '3132',
    // '3131',
    // '3114',
    // '3113',
    // '3112',
  ];

  return !invalidIds.includes(itemId);
}

function isMaterial(sortId) {
  return sortId >= 23 && sortId <= 57;
}

function isChip(sortId) {
  return sortId >= 74 && sortId <= 97;
}


function parseItems() {
  const result = [];

  itemArr.forEach(item => {
    const {
      itemId,
      name,
      rarity,
      sortId,
      itemType,
      description,
      usage,
      iconId,
      buildingProductList = []
    } = item;

    if (!isValidSortId(sortId) || !isValidItemId(itemId)) {
      return;
    }

    let { stageDropList = [] } = item;
    if (stageDropList.length > 0) {
      stageDropList = stageDropList.filter(drop => drop.stageId.indexOf('a001_') < 0);
      stageDropList.forEach(drop => {
        const { stageId, occPer } = drop;
        drop.occPer = DropLevels[occPer];
        const stage = stageMaps.filter(st => st.id === stageId)[0];
        if (stage) {
          drop.stage = stage;
        }
      });
    }

    let buildings = [];
    if (buildingProductList.length > 0) {
      buildings = buildingProductList.map(build => {
        const { formulaId, roomType } = build;
        const formula = formulas.filter(f => f.formulaId === formulaId && f.roomType === roomType)[0];

        if (formula) {
          formula.costs.forEach(cost => {
            const item = itemArr.filter(item => item.itemId === cost.id)[0];
            if (item) {
              cost.name = item.name;
              cost.rarity = item.rarity;
              delete cost.type;
            }
          });

          return formula;
        }
      });
    }

    buildings = buildings.filter(b => b);
    const path = `require('../../assets/icons/${iconId}.png')`;
    iconList[iconId] = path;

    result.push({
      id: itemId,
      name,
      sortId,
      rarity,
      itemType,
      description,
      usage,
      drops: stageDropList,
      buildings,
      iconId,
      isChip: isChip(sortId),
      isMaterial: isMaterial(sortId),
    });
  });

  return result;
}

function parseStoreItems() {
  const result = [];

  allItems
    .filter(item => isValidSortId(item.sortId) && isValidItemId(item.id)) // 信物全都不要
    .forEach(item => {
      const { id, name, sortId, rarity } = item;
      result.push({
        id, name, sortId, rarity
      });
    });

  return _.sortBy(result, 'sortId');
}

function fillItem(item) {
  const { children } = item;
  children.forEach(child => {
    const { id } = child;
    if (child.item) {
      return;
    }

    const costItem = materialItems.filter(ai => ai.id === id)[0];
    // 不是芯片才继续下一层
    if (costItem) {
      fillItem(costItem);
      child.children = _.clone(costItem.children);
    }
  });
}

function fillItems(items) {
  items.forEach(item => {
    fillItem(item);
  });
}
// 所有的 item
const itemKeys = Object.keys(items);
const itemArr = itemKeys.map(key => items[key]);

const iconList = {};
const stageMaps = parseStages();
const formulas = parseFormulas();
const allItems = parseItems();

const storeItems = parseStoreItems();

let materialItems = allItems
.filter(ai => isMaterial(ai.sortId))
.map(itm => {
  const { buildings = [] } = itm;
  let children = [];
  if (buildings.length > 0) {
    children = _.clone(buildings[0].costs);
  }

  return {
    id: itm.id,
    name: itm.name,
    sortId: itm.sortId,
    rarity: itm.rarity,
    children,
  };
});

materialItems = _.clone(materialItems);
fillItems(materialItems);

exports.exportItems = function () {
  // start write
  const itemDir = path.join(__dirname, 'items');
  fs.ensureDirSync(itemDir);
  fs.emptyDirSync(itemDir);

  writeFile(itemDir, 'icons.js', iconList, (value) => {
    value = value.replace(/\"require/ig, 'require');
    value = value.replace(/\)\"/ig, ')');
    return `export const iconMaps = ${value}`;
  });


  writeFile(itemDir, 'formulas.json', formulas);
  writeFile(itemDir, 'stages.json', stageMaps);
  writeFile(itemDir, 'items.json', allItems);
  writeFile(itemDir, 'store_items.json', storeItems);
  writeFile(itemDir, 'material_items.json', _.sortBy(materialItems, 'sortId'));
};
