document.addEventListener('DOMContentLoaded', function() {
    const gradeDropdown = document.getElementById('grade-dropdown');
    const creditsInput = document.getElementById('credits-input');
    const addCourseBtn = document.getElementById('add-course-btn');
    const coursesList = document.querySelector('#courses-list tbody');
    const gpaResult = document.getElementById('gpa');
    const cgpaInput = document.getElementById('cgpa-input');
    const calculateCgpaBtn = document.getElementById('calculate-cgpa-btn');
    const newCgpaResult = document.getElementById('new-cgpa');
  
    let courses = [];
  
    addCourseBtn.addEventListener('click', function() {
      const selectedGrade = gradeDropdown.value;
      const credits = parseInt(creditsInput.value);
  
      if (selectedGrade === '' || isNaN(credits) || credits < 1 || credits > 5) {
        alert('Please enter valid grade and credits');
        return;
      }
  
      courses.push({ grade: parseFloat(selectedGrade), credits });
  
      gradeDropdown.value = '';
      creditsInput.value = '';
  
      coursesList.innerHTML = '';
  
      courses.forEach(function(course) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${course.grade}</td><td>${course.credits}</td>`;
        coursesList.appendChild(row);
      });
  
      calculateGPA();
    });
  
    calculateCgpaBtn.addEventListener('click', function() {
      const currentCgpa = parseFloat(cgpaInput.value);
      if (isNaN(currentCgpa) || currentCgpa < 0 || currentCgpa > 4) {
        alert('Please enter a valid CGPA between 0 and 4');
        return;
      }
  
      // Calculate new CGPA
      const newCgpa = (currentCgpa + calculateGPA()) / 2;
      newCgpaResult.textContent = `New CGPA: ${newCgpa.toFixed(2)}`;
    });
  
    function calculateGPA() {
      const totalCredits = courses.reduce((acc, course) => acc + course.credits, 0);
      const totalGrades = courses.reduce((acc, course) => acc + (course.grade * course.credits), 0);
      const gpa = totalGrades / totalCredits;
      gpaResult.textContent = `GPA: ${gpa.toFixed(2)}`;
      return gpa;
    }
  });