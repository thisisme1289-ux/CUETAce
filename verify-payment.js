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
    const { payment_id } = body;

    if (!payment_id || !payment_id.startsWith('CA-')) {
      return new Response(JSON.stringify({ error: 'Invalid payment_id' }), { status: 400, headers: CORS });
    }

    const payload = {
      fetch_payment: {
        account_id: env.ZEROTIZE_ACCOUNT_ID,
        secret_key:  env.ZEROTIZE_SECRET_KEY,
        payment_id:  payment_id
      }
    };

    const res  = await fetch('https://zerotize.in/api_payment_status', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload)
    });

    const data = await res.json();

    const status = (data.payment_status || data.status || '').toLowerCase();

    if (status === 'success' || status === 'paid' || status === 'completed') {
      const plan = payment_id.startsWith('CA-P-') ? 'premium' : 'basic';
      return new Response(JSON.stringify({ verified: true, plan }), { status: 200, headers: CORS });
    }

    if (status === 'pending') {
      return new Response(JSON.stringify({
        verified: false,
        status: 'pending',
        message: 'Payment is still processing. Wait a moment and try again.'
      }), { status: 200, headers: CORS });
    }

    return new Response(JSON.stringify({
      verified: false,
      status: 'failed',
      message: 'Payment not confirmed. If you paid, wait 30 seconds and try again.'
    }), { status: 200, headers: CORS });

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
