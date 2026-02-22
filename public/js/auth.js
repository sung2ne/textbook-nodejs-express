// 이메일 중복 검사 Ajax
document.addEventListener('DOMContentLoaded', function () {
  const emailInput = document.getElementById('email');
  const emailFeedback = document.getElementById('email-feedback');

  if (emailInput) {
    emailInput.addEventListener('blur', function () {
      const email = emailInput.value.trim();
      if (!email) return;

      fetch('/auth/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.exists) {
            emailFeedback.textContent = '이미 사용 중인 이메일입니다.';
            emailFeedback.classList.add('text-danger');
            emailFeedback.classList.remove('text-success');
          } else {
            emailFeedback.textContent = '사용 가능한 이메일입니다.';
            emailFeedback.classList.add('text-success');
            emailFeedback.classList.remove('text-danger');
          }
        })
        .catch(() => {
          emailFeedback.textContent = '확인 중 오류가 발생했습니다.';
        });
    });
  }
});
