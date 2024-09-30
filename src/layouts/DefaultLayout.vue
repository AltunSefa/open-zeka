<template>
    <div>
      <header>
        <h1 class="header-title">Open Zeka Interview Task App</h1>
        
      </header>
      
      <main>
        <slot></slot> 
      </main>
  
      <footer>
        <p>Open Zeka İnterview Task App</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DefaultLayout'
  }
  </script>
  
  <style scoped>
  header {
    background: #333;
    color: white;
    padding: 1rem;
  }
  
  .header-title {
    margin: 0;
    left: 0;
  }
  
  h1 {
    margin: 0;
  }
  
  footer {
    margin: 0;
    text-align: center;
    padding: 1rem;
    background: #f1f1f1;
    position: fixed;
    width: 100%;
    bottom: 0;
  }
  </style>
  