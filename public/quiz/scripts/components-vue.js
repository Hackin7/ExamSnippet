var vueC = {};
vueC.view = {};
vueC.view.questionHeader = Vue.component('question-header', {
  props: ['Q', 'marks'],
  template:
        '<span>{{Q.q_id}}: {{Q.question}} <b>[{{marks}}]</b><br><span>Tagged: {{Q.tags}}</span></span>'
});

Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
app.value('QuestionHeader', vueC.view.questionHeader);
