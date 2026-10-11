const BASE_URL = 'http://localhost:3000';

async function runTests() {
  console.log('=== NEXORA AUTHENTICATION TEST SUITE ===\n');
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
      failed++;
    }
  }

  // 1. Verify Homepage links & Dynamic Date
  try {
    const res = await fetch(`${BASE_URL}/`);
    const html = await res.text();
    assert(res.status === 200, '1. Homepage responds with HTTP 200');
    assert(html.includes('href="/login"'), '1. Homepage contains Login link pointing to /login');
    assert(html.includes('href="/register"'), '1. Homepage contains Get Started Free link pointing to /register');
    assert(!html.includes('SUN, OCT 11'), '1. Homepage does NOT contain hardcoded outdated date SUN, OCT 11');
  } catch (e) {
    assert(false, `1. Homepage failed: ${e.message}`);
  }

  // 1b. Verify Login page standardized terminology
  try {
    const res = await fetch(`${BASE_URL}/login`);
    const html = await res.text();
    assert(res.status === 200, '1b. Login page responds with HTTP 200');
    assert(html.includes('Welcome back.'), '1b. Login page heading is "Welcome back."');
    assert(html.includes('Your day, back in sync.'), '1b. Login page supporting text is "Your day, back in sync."');
    assert(html.includes('Log In'), '1b. Login page contains "Log In" button');
    assert(html.includes('Forgot password?'), '1b. Login page contains "Forgot password?" link');
    assert(html.includes("Don't have an account?") || html.includes("Don&#x27;t have an account?"), '1b. Login page contains "Don\'t have an account? Sign up"');
    assert(html.includes('Sign up'), '1b. Login page link text is "Sign up"');
    assert(!html.includes('>SIGN IN<'), '1b. Login card header does NOT contain redundant SIGN IN badge');
  } catch (e) {
    assert(false, `1b. Login terminology check failed: ${e.message}`);
  }

  // 1c. Verify Register page standardized terminology
  try {
    const res = await fetch(`${BASE_URL}/register`);
    const html = await res.text();
    assert(res.status === 200, '1c. Register page responds with HTTP 200');
    assert(html.includes('Create your account.'), '1c. Register page heading is "Create your account."');
    assert(html.includes('Create Account'), '1c. Register page button is "Create Account"');
    assert(html.includes('Already have an account?'), '1c. Register page contains "Already have an account? Log in"');
    assert(html.includes('Log in'), '1c. Register page link text is "Log in"');
  } catch (e) {
    assert(false, `1c. Register terminology check failed: ${e.message}`);
  }

  // 2. Invalid registration: missing fields
  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '', email: '', password: '', confirmPassword: '' }),
    });
    const data = await res.json();
    assert(res.status === 400, '2. Registration with missing fields returns HTTP 400');
    assert(Boolean(data.error), '2. Registration with missing fields returns clear validation error message');
  } catch (e) {
    assert(false, `2. Missing fields check failed: ${e.message}`);
  }

  // 3. Invalid registration: invalid email format
  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Alex', email: 'invalid-email', password: 'password123', confirmPassword: 'password123' }),
    });
    assert(res.status === 400, '3. Registration with invalid email format returns HTTP 400');
  } catch (e) {
    assert(false, `3. Invalid email test failed: ${e.message}`);
  }

  // 4. Invalid registration: password mismatch
  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Alex', email: 'alex@nexora.ai', password: 'password123', confirmPassword: 'different123' }),
    });
    const data = await res.json();
    assert(res.status === 400, '4. Password confirmation mismatch returns HTTP 400');
    assert(data.error.includes('match'), '4. Returns passwords mismatch error message');
  } catch (e) {
    assert(false, `4. Password mismatch test failed: ${e.message}`);
  }

  // 5. Valid registration
  const testEmail = `tester_${Date.now()}@nexora.ai`;
  const testPassword = 'Password123!';
  let authCookie = '';
  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Engineer',
        email: testEmail,
        password: testPassword,
        confirmPassword: testPassword,
      }),
    });
    const data = await res.json();
    const setCookie = res.headers.get('set-cookie');
    if (setCookie) {
      authCookie = setCookie.split(';')[0];
    }
    assert(res.status === 201, '5. Valid registration returns HTTP 201 Created');
    assert(data.user?.email === testEmail.toLowerCase(), '5. Returns user object with normalized email');
    assert(Boolean(authCookie.includes('nexora_session')), '5. Sets secure HTTP-only nexora_session cookie');
  } catch (e) {
    assert(false, `5. Valid registration test failed: ${e.message}`);
  }

  // 6. Duplicate registration
  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Engineer',
        email: testEmail,
        password: testPassword,
        confirmPassword: testPassword,
      }),
    });
    assert(res.status === 409, '6. Duplicate registration returns HTTP 409 Conflict');
  } catch (e) {
    assert(false, `6. Duplicate registration test failed: ${e.message}`);
  }

  // 7. Invalid login
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: 'WrongPassword999!',
      }),
    });
    const data = await res.json();
    assert(res.status === 401, '7. Invalid password returns HTTP 401 Unauthorized');
    assert(data.error === 'Invalid email or password.', '7. Returns generic error avoiding user enumeration');
  } catch (e) {
    assert(false, `7. Invalid login test failed: ${e.message}`);
  }

  // 8. Successful login
  let loginCookie = '';
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword,
        rememberMe: true,
      }),
    });
    const data = await res.json();
    const setCookie = res.headers.get('set-cookie');
    if (setCookie) {
      loginCookie = setCookie.split(';')[0];
    }
    assert(res.status === 200, '8. Valid login returns HTTP 200 OK');
    assert(data.user?.name === 'Test Engineer', '8. Valid login returns correct user name');
    assert(Boolean(loginCookie.includes('nexora_session')), '8. Valid login sets fresh session cookie');
  } catch (e) {
    assert(false, `8. Valid login test failed: ${e.message}`);
  }

  // 9. Current User session endpoint (/api/auth/me)
  try {
    const res = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: { Cookie: loginCookie },
    });
    const data = await res.json();
    assert(res.status === 200, '9. /api/auth/me returns HTTP 200 with session cookie');
    assert(data.user?.email === testEmail.toLowerCase(), '9. /api/auth/me returns authenticated user details');
  } catch (e) {
    assert(false, `9. Me endpoint check failed: ${e.message}`);
  }

  // 10. Server-side Route Protection (Middleware)
  try {
    // Unauthenticated request to /dashboard
    const unauthRes = await fetch(`${BASE_URL}/dashboard`, {
      redirect: 'manual',
    });
    assert(
      unauthRes.status === 307 || unauthRes.status === 308 || unauthRes.status === 302,
      '10. Unauthenticated access to /dashboard is redirected by server middleware'
    );
    const location = unauthRes.headers.get('location');
    assert(
      Boolean(location && location.includes('/login?callbackUrl=')),
      '10. Unauthenticated redirect preserves callbackUrl safely'
    );

    // Authenticated request to /dashboard
    const authRes = await fetch(`${BASE_URL}/dashboard`, {
      headers: { Cookie: loginCookie },
    });
    assert(authRes.status === 200, '10. Authenticated request to /dashboard succeeds with HTTP 200');
  } catch (e) {
    assert(false, `10. Middleware protection check failed: ${e.message}`);
  }

  // 11. Forgot password & reset password flow
  let devResetToken = '';
  try {
    const res = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail }),
    });
    const data = await res.json();
    assert(res.status === 200, '11. Forgot password request returns HTTP 200');
    assert(Boolean(data.message), '11. Returns generic enumeration-safe message');

    if (data.devResetUrl) {
      const match = data.devResetUrl.match(/token=([a-f0-9]+)/);
      if (match) devResetToken = match[1];
    }
  } catch (e) {
    assert(false, `11. Forgot password check failed: ${e.message}`);
  }

  if (devResetToken) {
    const newPassword = 'BrandNewPassword888!';
    try {
      // Test invalid token
      const invalidRes = await fetch(`${BASE_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: 'fake-invalid-token', password: newPassword, confirmPassword: newPassword }),
      });
      assert(invalidRes.status === 400, '12. Reset password with invalid token returns HTTP 400');

      // Test valid token
      const resetRes = await fetch(`${BASE_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: devResetToken, password: newPassword, confirmPassword: newPassword }),
      });
      assert(resetRes.status === 200, '13. Reset password with valid token returns HTTP 200');

      // Test single-use protection
      const reuseRes = await fetch(`${BASE_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: devResetToken, password: newPassword, confirmPassword: newPassword }),
      });
      assert(reuseRes.status === 400, '14. Token reuse fails with HTTP 400 (single-use enforced)');

      // Verify login with new password
      const newLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: testEmail, password: newPassword }),
      });
      assert(newLoginRes.status === 200, '15. Login with updated password succeeds with HTTP 200');
    } catch (e) {
      assert(false, `Password reset execution failed: ${e.message}`);
    }
  }

  // 12. Logout
  try {
    const res = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: 'POST',
    });
    const setCookie = res.headers.get('set-cookie');
    const cookieLower = (setCookie || '').toLowerCase();
    assert(res.status === 200, '16. Logout returns HTTP 200');
    assert(Boolean(cookieLower && (cookieLower.includes('max-age=0') || cookieLower.includes('expires='))), '16. Logout clears session cookie');
  } catch (e) {
    assert(false, `16. Logout check failed: ${e.message}`);
  }

  console.log(`\n=== TEST RESULTS: ${passed} PASSED, ${failed} FAILED ===\n`);
}

runTests();
