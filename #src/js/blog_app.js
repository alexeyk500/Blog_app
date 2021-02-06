(function(){
  // Создаем и возвращаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  // Создаем и возвращаем форму для ввода номера и кнопок искать "вперед" и "назад"
  function createMainPageForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapperGo = document.createElement('div');
    let buttonGo = document.createElement('button');
    let buttonHead = document.createElement('button');
    let buttonBack = document.createElement('button');

    // очищаем input и делаем кнопку disabled
    input.value = '';
    buttonGo.disabled = true;

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.style.maxWidth = '300px'
    input.style.borderRadius = '10px';
    input.placeholder = 'Введите номер старицы оглавления блога';
    buttonWrapperGo.classList.add('input-group-append');
    buttonGo.classList.add('btn', 'btn-success');
    buttonGo.style.borderRadius = '10px';
    buttonGo.style.marginLeft = '3px';
    buttonGo.textContent = 'Перейти';
    buttonHead.classList.add('btn', 'btn-info');
    buttonHead.style.marginLeft = '100px';
    buttonHead.style.borderRadius = '10px';
    buttonHead.style.width = '100px';
    buttonHead.textContent = 'Вперед';
    buttonBack.style.marginLeft = '5px';
    buttonBack.style.borderRadius = '10px';
    buttonBack.style.width = '100px';
    buttonBack.classList.add('btn', 'btn-info');
    buttonBack.textContent = 'Назад';

    form.append(input);
    form.append(buttonWrapperGo);
    buttonWrapperGo.append(buttonGo);
    form.append(buttonHead);
    form.append(buttonBack);


    return { form,
             input,
             buttonGo,
             buttonHead,
             buttonBack,
            };
  };

  // Создаем и возвращаем список заголовков
  function createTitleList() {
    let titleList = document.createElement('ul');
    titleList.classList.add('list-group');
    return titleList;
  }

  // Создаем и возвращаем элемент списка дел
  function createTitleList(titleItem, onRead) {
    // создаем елемент списка и задем ему стили
    let item = document.createElement('li');
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = titleItem.title;

    // создем кнопкy, задаем eq стили и пакуем в группу
    let buttonRead = document.createElement('button');
    buttonRead.classList.add('btn', 'btn-success');
    buttonRead.textContent = 'Готово';
    item.append(buttonRead);

    // вешаем обработчики событий на кнопки
    buttonRead.addEventListener('click', function() {
      console.log("Нажата кнопка Читать")
      onRead(titleItem);
    });

    return item;
  };

  // Функция получения статьи по ее номеру
  async function getPostsOnPage(num = 1){
    const response = await fetch(`https://gorest.co.in/public-api/posts?page=${num}`);
    if (!response.ok) {
      return [`ошибка обмена с сервером - status: ${response.status}`,];
    } else {
      responseJson = await response.json();
      console.log("responseJson -", responseJson);
      const posts = responseJson.data;
      console.log("posts -", posts);
      return posts
    };
  };

  // // Функция получения всех статей с сайта
  // async function getAllPages(){
  //   const response = await fetch('https://gorest.co.in/public-api/posts');
  //   console.log(response.code);
  //   const blogPosts = await response.json();
  //   return blogPosts;
  // }

  // // Функция получения статьи по ее номеру
  // async function getPostsOnPage(num = 1){
  //   const response = await fetch(`https://gorest.co.in/public-api/posts?page=${num}`);
  //   if (!response.ok) {
  //     return [`ошибка обмена с сервером - status: ${response.status}`,];
  //   } else {
  //     responseJson = await response.json();
  //     console.log("responseJson -", responseJson);
  //     const posts = responseJson.data;
  //     console.log("posts -", posts);
  //     return posts
  //   };
  // };

  // // Функция создания приложения
  // function createBlogApp () {
  // //console.log(getAllPages())

  // // Получаем список статей на странице num
  // // и вывод на печать
  // getPostsOnPage(293).then((posts) => {
  //   const postsTitleField = document.getElementById(id="posts_field");
  //   postsTitleField.textContent = "Страница номер"
  //   console.log("posts -", posts);
  //   posts.forEach((post, index) => {
  //     const item = document.createElement('p');
  //     item.textContent = (index+1) + ' - ' + post.title;
  //     postsTitleField.appendChild(item);
  //   });
  // });
  // };

  function createBlogApp () {
    const container = document.getElementById('postApp');
    const blogAppTitle = createAppTitle('Бложья жизнь');
    const mainPageForm = createMainPageForm();
    container.append(blogAppTitle);
    container.append(mainPageForm.form);
    // getPostsOnPage();
    // const titleList = createTitleList();
    // const container = document.getElementById('postApp');



    // function goJs() {
    //   num = 1;
    //   window.location = `https://gorest.co.in/public-api/posts?page=${num}`
    // };
    // goJs();

  };



  window.createBlogApp = createBlogApp;
})();
