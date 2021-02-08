(function(){
  // Создаем заголовок страницы
  function createPageTitle() {
    let row = document.createElement('div');
    row.style.marginBottom = '15px';
    let appTitle = document.createElement('h2');
    appTitle.style.marginBottom = '0';
    appTitle.innerHTML = 'Статья Номер ';
    row.append(appTitle);
    return row;
};

  function createPostPage() {
    //Создаем контейнер для приложения
    const container = document.getElementById('postPage');
    container.style.maxWidth = '1200px';
    // Создаем строку заголовка приложения
    const pageTitle = createPageTitle();
    container.append(appTitle);
  };

  window.createPostPage = createPostPage;

})();
