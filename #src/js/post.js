(function(){
  function renderPostPage(response) {
    response.then((response) => {
      console.log(response)
      //Создаем контейнер для страницы
      const container = document.getElementById('postPage');
      container.style.maxWidth = '1200px';
      // Создаем строку заголовка приложения
      const pageTitle = createPageTitle(response.responseJsonPost.data.title);
      container.append(pageTitle);
      // Создаем тело поста
      const pageBody = createPageBody(response.responseJsonPost.data.body);
      container.append(pageBody);
      // Создаем и отображаем комментарии
      const pageComments = createPageComments(response.responseJsonComment.data);
      container.append(pageComments);
    });
  };
  // Функция создания заголовока страницы c постом
  function createPageTitle(title) {
    let row = document.createElement('div');
    row.style.marginBottom = '30px';
    let postTitle = document.createElement('h1');
    postTitle.style.fontSize = '25px';
    postTitle.style.color = 'blue';
    postTitle.style.marginTop = '15px';
    postTitle.style.marginBottom = '15px';
    postTitle.innerHTML = title;
    row.append(postTitle);
    return row;
  };
  // Функция создания тела поста
  function createPageBody(body) {
    let row = document.createElement('div');
    row.style.marginBottom = '18px';
    let postBody = document.createElement('p');
    postBody.style.fontSize = '18px';
    postBody.style.color = 'gray';
    postBody.style.marginTop = '15px';
    postBody.style.marginBottom = '15px';
    postBody.style.borderBottom = "8px solid red";
    postBody.innerHTML = body;
    row.append(postBody);
    return row;
  };
  // Функция создания раздела комментариев
  function createPageComments(comments) {
    console.log('comments', comments);
    const row = document.createElement('div');
    row.style.marginBottom = '30px';
    row.style.color = 'green';
    console.log('comments.length', comments.length)
    if (comments.length > 0) {
      // комментарии есть
      const commentsList = document.createElement('ul');
      console.log(comments.length);
      comments.forEach(comment => {
        console.log(comment)
        const commentsListItem = document.createElement('li');
        const commentsListItemAutor = document.createElement('p');
        commentsListItemAutor.textContent = comment.name;
        commentsListItemAutor.style.marginBottom = 0;
        const commentsListItemBody  = document.createElement('p');
        commentsListItemBody.textContent = comment.body;
        commentsListItem.append(commentsListItemAutor);
        commentsListItem.append(commentsListItemBody);
        commentsList.append(commentsListItem);
      });
      row.append(commentsList);
    } else {
      let commentsMessge = document.createElement('p');
      commentsMessge.innerHTML = 'комментариев пока нет ...';
      row.append(commentsMessge);
    }
    return row;
  };
  // Функция возвращает id статьи из URL
  function getIdPost() {
    // Получаем адрес страницы
    const pageParams = new URLSearchParams(window.location.search);
    // получаем номер id
    const idPost = pageParams.get('id');
    return idPost;
  };
  // Функция получения данных c сервера по номеру страницы
  async function getPostsData(num){
    const responsePost = await fetch(`https://gorest.co.in/public-api/posts/${num}`);
    if (!responsePost.ok) {
      return [`ошибка обмена с сервером - status: ${response.status}`,];
    } else {
      // Запрос комментариев
      const responseComment = await fetch(`https://gorest.co.in/public-api/comments?post_id=${num}`);
      if (!responseComment.ok) {
        responseJsonComment  = { data: [] }.json();
      } else {
        responseJsonComment  = await responseComment.json();
      }
      responseJsonPost = await responsePost.json();

      return {responseJsonPost, responseJsonComment};
    };
  };
  // Функция создания старницы с постом
  function createPostPage() {
    // Получаем данные по посту из Url
    const idPost = getIdPost();
    console.log('id = ', idPost);
    // Получаем данные с сервера по посту
    const response = getPostsData(idPost);
    // Рендерим страницу
    renderPostPage(response);
  };
  window.createPostPage = createPostPage;
})();
