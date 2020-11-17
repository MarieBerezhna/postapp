module.exports = function (catArr, cat_id) {
    console.log(cat_id, catArr);
        let cat = catArr.filter(cat => cat.id === cat_id);
        cat = cat[0];
        if (cat) {
          cat = JSON.parse(JSON.stringify(cat));
        }
        return cat ? cat.name : "";
};