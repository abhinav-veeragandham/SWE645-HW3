import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import SurveyPage from '../views/SurveyPage.vue';
import SurveyList from '../components/SurveyList.vue';
import SurveyForm from '../components/SurveyForm.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/survey', component: SurveyPage },
  { path: '/surveys', component: SurveyList },
  { path: '/survey/:id/edit', component: SurveyForm }
];

const router = createRouter({
  history: createWebHistory(),
  routes 
});

export default router;
