function addTag(tag: TagInterface, tags: TagInterface[]) {
  let temp = [...tags,tag];
  let resArr: TagInterface[] = [];
  temp.filter(function (item) {
    var i = resArr.findIndex(
      (x) => x.value == item.value && x.display == item.display && x.kind == item.kind
    );
    if (i <= -1) {
      resArr.push(item);
    }
    return null;
  });
  return resArr;
}

function removeTag(tag: TagInterface, tags: TagInterface[]) {
  let resArr =  tags.filter((t) => t.value !== tag.value);
  return resArr

}

export { addTag, removeTag  };
