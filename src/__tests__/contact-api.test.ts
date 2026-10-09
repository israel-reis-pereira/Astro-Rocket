import { beforeEach, describe, expect, it, vi } from 'vitest';

const { send } = vi.hoisted(() => ({ send: vi.fn() }));

vi.mock('astro:env/server', () => ({
  RESEND_API_KEY: 'test-resend-key',
  RESEND_FROM_EMAIL: 'contato@israelreispereira.com.br',
  RESEND_AUDIENCE_ID: undefined,
  SITE_URL: undefined,
  GOOGLE_SITE_VERIFICATION: undefined,
  BING_SITE_VERIFICATION: undefined,
}));

vi.mock('resend', () => ({
  Resend: vi.fn(() => ({ emails: { send } })),
}));

import { Resend } from 'resend';
import { POST } from '../pages/api/contact';

const post = (formData: FormData) =>
  POST({
    request: new Request('http://localhost/api/contact', {
      method: 'POST',
      body: formData,
    }),
  } as Parameters<typeof POST>[0]);

function validFormData() {
  const formData = new FormData();
  formData.set('name', 'Ada Lovelace');
  formData.set('email', 'ada@example.com');
  formData.set('subject', 'A greeting');
  formData.set('message', 'Hello & <script>alert("hello")</script>\nThanks');
  formData.set('honeypot', '');
  return formData;
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    send.mockReset().mockResolvedValue({ data: { id: 'email-id' }, error: null });
    vi.mocked(Resend).mockClear();
  });

  it('returns JSON validation errors for invalid form data', async () => {
    const formData = validFormData();
    formData.set('email', 'invalid');

    const response = await post(formData);

    expect(response.status).toBe(400);
    expect(response.headers.get('Content-Type')).toBe('application/json');
    expect(await response.json()).toMatchObject({
      success: false,
      errors: { email: expect.any(Array) },
    });
    expect(send).not.toHaveBeenCalled();
  });

  it('accepts honeypot submissions without sending email', async () => {
    const formData = validFormData();
    formData.set('honeypot', 'bot-filled-this');

    const response = await post(formData);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true });
    expect(send).not.toHaveBeenCalled();
  });

  it('sends escaped email with the configured sender, recipient, and reply-to', async () => {
    const response = await post(validFormData());

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true });
    expect(Resend).toHaveBeenCalledWith('test-resend-key');
    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'Contact Form <contato@israelreispereira.com.br>',
        to: 'israelsilvapereirareis@gmail.com',
        replyTo: 'ada@example.com',
        subject: '[Israel Reis Pereira] A greeting',
        html: expect.stringContaining(
          'Hello &amp; &lt;script&gt;alert(&quot;hello&quot;)&lt;/script&gt;<br>Thanks'
        ),
      })
    );
  });

  it('returns a JSON error when Resend rejects the message', async () => {
    send.mockResolvedValueOnce({ data: null, error: { message: 'Rejected' } });
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});

    try {
      const response = await post(validFormData());

      expect(response.status).toBe(500);
      expect(await response.json()).toMatchObject({
        success: false,
        errors: { form: ['Rejected'] },
      });
    } finally {
      log.mockRestore();
    }
  });
});
