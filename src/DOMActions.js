const _getDOMElem = (id) => {
  return document.getElementById(id);
};

export const mapListToDOMElements = (listId) => {
  const _viewElem = {};

  for (const id of listId) {
    _viewElem[id] = _getDOMElem(id);
  }
  return _viewElem;
};
