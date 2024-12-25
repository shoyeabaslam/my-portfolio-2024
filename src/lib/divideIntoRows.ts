import { StaticImageData } from "next/image";

interface ImagesType{
  image:StaticImageData,
  glowEffectColor:string
}

export function divideIntoRows(images: ImagesType[], boxCount: number) {
    const rowCount = boxCount < 7 ? boxCount : boxCount - 2
    console.log(boxCount)
    const rows = [];
    for (let i = 0; i < images.length; i += rowCount) {
      let row = images.slice(i, i + rowCount);
      console.log(row)
      if (row.length < boxCount) {
        const emptySlots = boxCount - row.length;
        const padding = Math.floor(emptySlots / 2);
        row = [
          ...Array(padding).fill(undefined),
          ...row,
          ...Array(emptySlots - padding).fill(undefined),
        ];
      }
      rows.push(row);
    }
    return rows;
  }