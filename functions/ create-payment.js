export async function onRequestPost(context) {
  const { env, request } = context;

  const CORS = {
    'Access-Control-Allow-Origin': 'https://cuetace.fun',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  try {
    const body = await request.json();
    const { plan, device_id } = body;

    if (!plan || !['basic', 'premium'].includes(plan)) {
      return new Response(JSON.stringify({ error: 'Invalid plan' }), { status: 400, headers: CORS });
    }
    if (!device_id) {
      return new Response(JSON.stringify({ error: 'Missing device_id' }), { status: 400, headers: CORS });
    }

    const amount     = plan === 'basic' ? 100 : 200;
    const purpose    = plan === 'basic' ? 'CUETAce Basic Plan' : 'CUETAce Premium Plan';
    const payment_id = 'CA-' + (plan === 'basic' ? 'B' : 'P') + '-' + Date.now() + '-' + device_id.slice(-6);
    const redirect   = `https://cuetace.fun/?payment_id=${payment_id}&plan=${plan}`;

    const payload = {
      init_payment: {
        account_id:      env.ZEROTIZE_ACCOUNT_ID,
        secret_key:      env.ZEROTIZE_SECRET_KEY,
        payment_id:      payment_id,
        payment_purpose: purpose,
        payment_amount:  String(amount),
        redirect_url:    redirect
      }
    };

    const res  = await fetch('https://zerotize.in/api_payment_init', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload)
    });

    const data = await res.json();

    if (data && data.payment_url) {
      return new Response(JSON.stringify({ payment_url: data.payment_url, payment_id }), { status: 200, headers: CORS });
    }

    return new Response(JSON.stringify({ error: 'Could not create payment. Try again.' }), { status: 502, headers: CORS });

  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error: ' + err.message }), { status: 500, headers: CORS });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin':  'https://cuetace.fun',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
