const importScript = script => {
  const tag = document.createElement('script');
  tag.src = script;
  document.body.appendChild(tag);
}

export default importScript;
