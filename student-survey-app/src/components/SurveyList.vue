<template>
    <nav class="navbar">
        <router-link to="/" class="nav-item">Home</router-link>
        <router-link to="/survey" class="nav-item">Survey Form</router-link>
        <router-link to="/surveys" class="nav-item">Survey Submissions</router-link>
    </nav>
    <div class="container">
        <h2>Submitted Surveys</h2>

        <div class="survey-table-wrapper">
            <table class="survey-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Street</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Survey Date</th>
                        <th>Liked Most</th>
                        <th>Interest Source</th>
                        <th>Recommendation</th>
                        <th>Comments</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="survey in surveys" :key="survey.id">
                        <td>{{ survey.id }}</td>
                        <td>{{ survey.firstName }}</td>
                        <td>{{ survey.lastName }}</td>
                        <td>{{ survey.street }}</td>
                        <td>{{ survey.city }}</td>
                        <td>{{ survey.state }}</td>
                        <td>{{ survey.zip }}</td>
                        <td>{{ survey.phone }}</td>
                        <td>{{ survey.email }}</td>
                        <td>{{ survey.surveyDate }}</td>
                        <td>
                            <ul>
                                <li v-for="(item, index) in survey.likedMost" :key="index">{{ item }}</li>
                            </ul>
                        </td>
                        <td>{{ survey.interestSource }}</td>
                        <td>{{ survey.recommendation }}</td>
                        <td>{{ survey.comments }}</td>
                        <td class="action-buttons">
                            <button @click="editSurvey(survey.id)">Edit</button>
                            <button @click="deleteSurvey(survey.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'SurveyList',
    data() {
        return {
            surveys: []
        };
    },
    methods: {
        async fetchSurveys() {
            try {
                const res = await axios.get(`${process.env.VUE_APP_API_BASE}/api/surveys`);
                this.surveys = res.data;
            } catch (err) {
                console.error('Error fetching surveys:', err);
            }
        },
        editSurvey(id) {
            this.$router.push(`/survey/${id}/edit`);
        },
        async deleteSurvey(id) {
            if (confirm('Are you sure you want to delete this survey?')) {
                try {
                    await axios.delete(`${process.env.VUE_APP_API_BASE}/api/surveys/${id}`);
                    this.surveys = this.surveys.filter(s => s.id !== id);
                } catch (err) {
                    console.error('Error deleting survey:', err);
                }
            }
        }
    },
    mounted() {
        this.fetchSurveys();
    }
};
</script>

<style scoped>
.container {
    max-width: 95%;
    margin: 40px auto;
    background-color: #ffffff;
    padding: 20px 30px;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
    font-family: 'Trebuchet MS', sans-serif;
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

h2 {
    text-align: center;
    color: #142d4c;
    margin-bottom: 20px;
}

.survey-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
}

.survey-table th,
.survey-table td {
    padding: 10px 12px;
    border: 1px solid #ccc;
    text-align: left;
    vertical-align: top;
}

.survey-table th {
    background-color: #385170;
    color: white;
}

.survey-table tr:nth-child(even) {
    background-color: #f9f9f9;
}

.survey-table tr:hover {
    background-color: #f1f7ff;
}

.action-buttons {
    display: flex;
    gap: 8px;
}

.action-buttons button {
    padding: 6px 10px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-family: 'Trebuchet MS', sans-serif;
    transition: background-color 0.3s ease;
}

.action-buttons button:first-child {
    background-color: #ffc107;
    color: #000;
}

.action-buttons button:last-child {
    background-color: #dc3545;
    color: white;
}

.action-buttons button:hover {
    opacity: 0.85;
}

.survey-table-wrapper {
    overflow-x: auto;
}
</style>