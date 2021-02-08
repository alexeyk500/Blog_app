(function(){

  // Рендерим главную старницу приложения
  function renderMainPage(responseJson) {
    responseJson.then((response) => {
      //Создаем контейнер для приложения
      const container = document.getElementById('postApp');
      container.style.maxWidth = '1200px';
      // Создаем строку заголовка приложения
      const page = response.meta.pagination.page;
      const pages = response.meta.pagination.pages;
      const total = response.meta.pagination.total;
      const appTitle = createAppTitle({page, pages, total})
      container.append(appTitle);
      // Создаем навигацию по страницам блога
      const navigation = createNavigation(pages);
      container.append(navigation.form);
      // Создаем список заголовок статей
      const titles = response.data;
      const titleList = createTitleList(titles, page);
      container.append(titleList);
    });
  };

  // Рендеринг постов
  function createPostPage(responseJson) {
    responseJson.then((response) => {
      const data = response.data;
      postPart = document.createElement('div');
      data.forEach((post) => {
        let article = document.createElement('div');
        article.textContent = post.body;
        article.id = post.id
        postPart.append(article);
      });
    });
  };

  // Создаем и возвращаем заголовок приложения
  function createAppTitle({page, pages, total}) {
      let row = document.createElement('div');
      row.style.display = 'flex';
      row.style.marginBottom = '15px';
      row.style.alignItems = 'center';
      let appTitle = document.createElement('h2');
      appTitle.style.marginBottom = '0';
      appTitle.innerHTML = 'Боложья жизнь в ' + total + ' статьях';
      appTitle.style.marginRight = '245px';
      let pageStr = document.createElement('p');
      const pageParams = new URLSearchParams(window.location.search);
      console.log('pageParams', pageParams)
      pageStr.innerHTML = ' стр. ' + page + ' из ' + pages;
      pageStr.style.marginBottom = '0';
      pageStr.style.transform = 'translateY(3px)'
      row.append(appTitle);
      row.append(pageStr);
      return row;
  };
  // Создаем и возвращаем форму для ввода номера и кнопок искать "вперед" и "назад"
  function createNavigation(pages) {
    let form = document.createElement('div');
    let input = document.createElement('input');
    let buttonWrapperGo = document.createElement('div');
    let buttonBegin = document.createElement('button');
    let buttonGo = document.createElement('button');
    let buttonHead = document.createElement('button');
    let buttonBack = document.createElement('button');
    const NumPage = getNumCurrentPage()

    // очищаем input и делаем кнопку disabled
    input.value = '';
    buttonGo.disabled = true;
    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.type = 'number';
    input.style.maxWidth = '400px'
    input.style.borderRadius = '10px';
    input.placeholder = 'Введите номер старицы оглавления блога';
    buttonWrapperGo.classList.add('input-group-append');
    buttonGo.classList.add('btn', 'btn-success');
    buttonGo.style.borderRadius = '10px';
    buttonGo.style.marginLeft = '3px';
    buttonGo.textContent = 'Перейти';
    if (NumPage === 1) {
      buttonBegin.disabled = true;
    } else {
      buttonBegin.disabled = false;
    }
    buttonBegin.classList.add('btn', 'btn-info');
    buttonBegin.style.marginLeft = '100px';
    buttonBegin.style.borderRadius = '10px';
    buttonBegin.style.width = '100px';
    buttonBegin.textContent = 'В начало';
    // Если страница полседняя то делаем кнопку недоступной
    if (NumPage === pages) {
      buttonHead.disabled = true;
    } else {
      buttonBack.disabled = false;
    }
    buttonHead.classList.add('btn', 'btn-info');
    buttonHead.style.marginLeft = '5px';
    buttonHead.style.borderRadius = '10px';
    buttonHead.style.width = '100px';
    buttonHead.textContent = 'Вперед';
    // Если страница первая то делаем кнопку недоступной
    if (NumPage === 1) {
      buttonBack.disabled = true;
    } else {
      buttonBack.disabled = false;
    }
    buttonBack.style.marginLeft = '50px';
    buttonBack.style.borderRadius = '10px';
    buttonBack.style.width = '100px';
    buttonBack.classList.add('btn', 'btn-info');
    buttonBack.textContent = 'Назад';

    form.append(input);
    form.append(buttonWrapperGo);
    buttonWrapperGo.append(buttonGo);
    form.append(buttonBegin);
    form.append(buttonBack);
    form.append(buttonHead);

    // ввод в инпут номера страницы для перехода
    let writeInput = function (pages) {
      return function f() {
        console.log(parseInt(input.value), pages);
        if ((parseInt(input.value) > 0) && (parseInt(input.value) <= pages)){
          buttonGo.disabled = false;
          console.log('buttonGo.disabled = ', buttonGo.disabled);
        } else {
          buttonGo.disabled = true;
        }
      }
    }
    input.addEventListener('input', writeInput(pages));

    // Нажатие на кнопку перейти по номеру из инпута
    buttonGo.addEventListener('click', function() {
      console.log("иду на страницу")
      const newNumPage = parseInt(input.value).toString();
      newWindow = window.open(`index.html?page=${newNumPage}`, '_self', false);
      newWindow.focus();
    });

    // Возврат в начало списка заголовков
    buttonBegin.addEventListener('click', function() {
      console.log("иду в начало списка")
      newWindow = window.open('index.html','_self', false);
      newWindow.focus();
    });

    // Шаг на страницу дальше
    buttonHead.addEventListener('click', function() {
      const newNumPage = (NumPage + 1).toString();
      newWindow = window.open(`index.html?page=${newNumPage}`, '_self', false);
      newWindow.focus();
    });

    // Шаг на предыдущую страницу
    buttonBack.addEventListener('click', function() {
      const newNumPage = (NumPage - 1).toString();
      newWindow = window.open(`index.html?page=${newNumPage}`, '_self', false);
      newWindow.focus();
    });

    return { form,
             input,
             buttonGo,
             buttonHead,
             buttonBack,
            };
  };
  // Создаем и возвращаем список заголовков
  function createTitleList(titles, page) {
    let titleList = document.createElement('ol');
    titleList.classList.add('list-group');
    titleList.style.width = '75%';
    titleList.start = (page-1) * 20 + 1;
    titles.forEach((post) => {
      titleListItem = createTitleListItem(post);
      titleList.append(titleListItem);
    });
    return titleList;
  };
  // Создаем и возвращаем элемент списка заголовков
  function createTitleListItem(titleItem) {
    // создаем элемент списка и задем ему стили
    const item = document.createElement('li');
    const row = document.createElement('div');
    const item_link = document.createElement('a');
    item_link.textContent = titleItem.title;
    row.style.whiteSpace = 'nowrap';
    row.style.overflow = 'hidden';
    row.style.marginBottom = '3px';
    row.style.fontSize = '14px';
    item_link.style.textDecoration = 'none';
    row.append(item_link);
    item.append(row)
    return item;
  };
  // Функция получения данных c сервера по номеру страницы
  async function getPostsOnPage(num = 1){
    const response = await fetch(`https://gorest.co.in/public-api/posts?page=${num}`);
    if (!response.ok) {
      return [`ошибка обмена с сервером - status: ${response.status}`,];
    } else {
      responseJson = await response.json();
      return responseJson;
    };
  };
  // Функция возвращает номер текущей страницы
  function getNumCurrentPage() {
    // Получаем адрес страницы
    const pageParams = new URLSearchParams(window.location.search);
    // получаем номер страницы с заголовками постов
    let numPage = pageParams.get('page');
    console.log('pageParams.get("page")', numPage);
    if (numPage === null) {
      console.log('обнаружил ноль в страницах')
      numPage = 1;
    };
    console.log('Итоговый numPage = ', numPage)
    return parseInt(numPage);
  };

  function createBlogApp () {
    const numPage = getNumCurrentPage();
    const responseJson = getPostsOnPage(numPage);
    console.log ('responseJson', responseJson);
    renderMainPage(responseJson);
    //createPostPage(responseJson);

  };

  window.createBlogApp = createBlogApp;

})();
