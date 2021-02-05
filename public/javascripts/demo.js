window.addEventListener('DOMContentLoaded', (event) => {
  document.querySelector('.demo').addEventListener('click', e => {
    console.log(e)
    e.preventDefault();
    document.getElementById('username').value = 'Demo'
    document.getElementById('password').value = 'Pa$$word4'
  })
})