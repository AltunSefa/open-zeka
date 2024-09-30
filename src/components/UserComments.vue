<template>
    <div>
      <h2>Yorumlar</h2>
      <p>Yorum verileri buraya gelecek.</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      user: {
        type: Object,
        required: true
      }
    }
  }
  </script>
  