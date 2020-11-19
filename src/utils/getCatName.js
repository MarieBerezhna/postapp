export default function (catArr, cat_id) {
        let cat = catArr.filter(cat => cat.id === cat_id);
        cat = cat[0];
        if (cat) {
          cat = JSON.parse(JSON.stringify(cat));
        }
        return cat ? cat.name : "";
}