import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
          background: 'linear-gradient(135deg, #FF3E8A 0%, #7B2FBE 100%)',
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 900,
            color: 'white',
            fontFamily: 'sans-serif',
            lineHeight: 1,
            textShadow: '0 1px 2px rgba(0,0,0,0.2)',
          }}
        >
          SC
        </div>
      </div>
    ),
    { ...size }
  );
}
