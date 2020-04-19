export function getTransCatDataForTable(transactions: any) {
  let groupedTransactions: any = {};
  transactions.forEach((obj: any, index: number) => {
    const keyName = obj.name.concat(obj.memo);
    if (Object.keys(groupedTransactions).includes(keyName)) {
      groupedTransactions[keyName].ids.push(obj.id);
    } else {
      groupedTransactions[keyName] = {
        id: index + 1,
        name: obj.name,
        memo: obj.memo,
        categoryName: obj.categoryName,
        subCategoryName: obj.subCategoryName,
        categoryId: obj.categoryId,
        ids: [obj.id],
      };
    }
  });

  const arrayedGroupedTransactions: any = [];
  Object.keys(groupedTransactions).forEach((obj) => {
    arrayedGroupedTransactions.push(groupedTransactions[obj]);
  });

  arrayedGroupedTransactions.sort((a: any, b: any) => {
    if (b.ids.length < a.ids.length) return -1;
    if (a.ids.length > b.ids.length) return 1;
    return 0;
  });

  return arrayedGroupedTransactions;
}

// data.forEach((obj) => {
//     if (Object.keys(moreData).includes(obj.name)) {
//       if (Object.keys(moreData[obj.name].memos).includes(obj.memo)) {
//         moreData[obj.name].memos[obj.memo].count += 1;
//         moreData[obj.name].count += 1;
//         moreData[obj.name].memos[obj.memo].ids.push(obj.id);
//       } else {
//         let newMemo = { name: obj.memo, count: 1, ids: [obj.id] };
//         moreData[obj.name].count += 1;
//         moreData[obj.name].memos[obj.memo] = newMemo;
//       }
//     } else {
//       let memos: any = {};
//       memos[obj.memo] = { name: obj.memo, count: 1, ids: [obj.id] };
//       moreData[obj.name] = {
//         name: obj.name,
//         count: 1,
//         memos,
//       };
//     }
// });

//   interface IMemos {
//     name: string;
//     count: number;
//   }

//   interface ICategoryData {
//     name: string;
//     count: number;
//     ids: string[];
//     memos: Map<string, IMemos>;
//   }
//   let moreData: Map<string, ICategoryData> = new Map();
//   let memos: Map<string, IMemos> = new Map();
//   data.forEach((obj, i) => {
//     if (Object.keys(moreData).includes(obj.name)) {
//       if (Object.keys(moreData.get(obj.name)!.memos).includes(obj.memo)) {
//         let memos = moreData.get(obj.name)!.memos;
//         let oldMemo = memos.get(obj.memo);
//         let newMemo = Object.assign(
//           {},
//           { ...oldMemo! },
//           { count: oldMemo!.count += 1 }
//         );
//         memos.set(obj.memo, newMemo);
//         let newData = Object.assign(
//           {},
//           { ...moreData.get(obj.name)! },
//           { memos: memos! }
//         );
//         moreData.set(obj.name, newData);
//       } else {
//         memos.set(obj.memo, { name: obj.memo, count: 1 });
//         let newData = Object.assign(
//           {},
//           { ...moreData.get(obj.name)! },
//           { memos: memos! }
//         );
//         moreData.set(obj.name, newData);
//       }
//     } else {
//       memos.set(obj.memo, { name: obj.memo, count: 1 });
//       moreData.set(obj.name, {
//         name: obj.name,
//         count: 1,
//         ids: [obj.id],
//         memos: memos,
//       });
//     }
//   });
//console.log("More data", moreData);

//console.log("Transcattable 11: ", data);
