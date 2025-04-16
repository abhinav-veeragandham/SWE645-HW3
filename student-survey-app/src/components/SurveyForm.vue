<template>
  <nav class="navbar">
    <router-link to="/" class="nav-item">Home</router-link>
    <router-link to="/survey" class="nav-item">Survey Form</router-link>
    <router-link to="/surveys" class="nav-item">Survey Submissions</router-link>
  </nav>
  <div class="container">
    <h2>Student Survey Form</h2>
    <form @submit.prevent="onSubmit">
      <!-- Personal Info -->
      <div class="section-title">Personal Information</div>
      <input v-model="survey.firstName" placeholder="First Name" required />
      <input v-model="survey.lastName" placeholder="Last Name" required />
      <input v-model="survey.street" placeholder="Street" required />

      <div class="row-group">
        <input v-model="survey.zip" placeholder="Zip" required @blur="autoFillCityState" />
        <input v-model="survey.city" placeholder="City" readonly />
        <input v-model="survey.state" placeholder="State" readonly />
      </div>

      <input v-model="survey.phone" placeholder="Phone" required />
      <input v-model="survey.email" placeholder="Email" required />

      <div class="section-title">Date of Survey</div>
      <input v-model="survey.surveyDate" type="date" required />

      <!-- Liked Most -->
      <div class="section-title">What did you like most about the campus?</div>
      <div class="checkbox-group">
        <label v-for="item in likedOptions" :key="item">
          <input type="checkbox" :value="item" v-model="survey.likedMost" /> {{ item }}
        </label>
      </div>

      <!-- Interest Source -->
      <div class="section-title">How did you hear about us?</div>
      <div class="radio-group">
        <label v-for="source in interestSources" :key="source">
          <input type="radio" :value="source" v-model="survey.interestSource" /> {{ source }}
        </label>
      </div>

      <!-- Recommendation -->
      <div class="section-title">How likely are you to recommend our campus to others?</div>
      <select v-model="survey.recommendation">
        <option disabled value="">Select an option</option>
        <option>Very Likely</option>
        <option>Likely</option>
        <option>Unlikely</option>
      </select>

      <!-- Comments -->
      <div class="section-title">Additional Comments</div>
      <textarea v-model="survey.comments" placeholder="Write any additional comments here..."></textarea>

      <!-- Buttons -->
      <button type="submit">Submit</button>
      <button type="button" @click="onCancel">Cancel</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const isEditing = ref(false);

console.log("Editing ID:", route.params.id);

const likedOptions = ['Campus', 'Students', 'Location', 'Atmosphere'];
const interestSources = ['Friends', 'Television', 'Internet', 'Other'];

const survey = ref({
  firstName: '',
  lastName: '',
  street: '',
  zip: '',
  city: '',
  state: '',
  phone: '',
  email: '',
  surveyDate: '',
  likedMost: [],
  interestSource: '',
  recommendation: '',
  comments: ''
});

onMounted(async () => {
  const id = route.params.id;
  if (id) {
    try {
      const res = await axios.get(`${process.env.VUE_APP_API_BASE}/api/surveys/${id}`);
      survey.value = res.data;
      isEditing.value = true;
    } catch (err) {
      console.error('Failed to load survey:', err);
    }
  }
});

const autoFillCityState = async () => {
  const zip = survey.value.zip.trim();
  if (zip.length !== 5) return;

  try {
    const res = await fetch(`https://api.zippopotam.us/us/${zip}`);
    if (!res.ok) throw new Error('Invalid ZIP');
    const data = await res.json();
    survey.value.city = data.places[0]['place name'];
    survey.value.state = data.places[0]['state abbreviation'];
  } catch (err) {
    survey.value.city = '';
    survey.value.state = '';
    console.error('ZIP lookup failed:', err);
  }
};

const onSubmit = async () => {
  try {
    const id = route.params.id;
    if (isEditing.value && id) {
      await axios.put(`${process.env.VUE_APP_API_BASE}/api/surveys/${id}`, survey.value);
      alert('Survey updated successfully!');
    } else {
      await axios.post(`${process.env.VUE_APP_API_BASE}/api/surveys`, survey.value);
      alert('Survey submitted successfully!');
    }
    router.push('/surveys');
  } catch (err) {
    console.error('Submission error:', err);
    alert('Something went wrong while submitting the form.');
  }
};

const onCancel = () => {
  router.push('/surveys');
};
</script>


<style scoped>
.container {
  max-width: 800px;
  margin: 40px auto;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  font-family: 'Trebuchet MS', sans-serif;
}

form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.navbar {
  background-color: #142d4c;
  display: flex;
  padding: 12px 24px;
  gap: 20px;
  align-items: center;
}

.nav-item {
  color: #9fd3c7;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  transition: color 0.2s;
}

.nav-item:hover {
  color: #ffffff;
}

input,
select,
textarea {
  padding: 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-family: 'Trebuchet MS', sans-serif;
  transition: border-color 0.3s;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #385170;
  outline: none;
}

.row-group {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.row-group input {
  flex: 1;
  min-width: 100px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

.section-title {
  margin-top: 20px;
  font-size: 18px;
  color: #142d4c;
  font-weight: bold;
  text-align: left;
}

button {
  padding: 12px 24px;
  font-size: 16px;
  background-color: #385170;
  color: white;
  border: none;
  border-radius: 6px;
  font-family: 'Trebuchet MS', sans-serif;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #142d4c;
}

button[disabled] {
  background-color: #ccc;
  cursor: not-allowed;
}

.checkbox-group,
.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
