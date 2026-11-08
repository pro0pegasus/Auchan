import { fetchFakeData } from "./api";
import { validateContactForm } from '.validation.js'

const form = document.getElementById('contact-form');
const feedback = document.getElementById('contact-feedback');
const submitButton = document.getElementById('send-message');

