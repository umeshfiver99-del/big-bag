export function ConnectorLogo({ name, domain }: { name: string; domain: string }) {
  return (
    <span className="connector-logo" aria-hidden="true">
      <b>{name.slice(0, 1)}</b>
      {/* Google resolves the site's own favicon and returns a neutral icon when a
          domain has none. This avoids a guaranteed 404 request for unsupported
          Simple Icons slugs while keeping recognizable, real service marks. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(`https://${domain}`)}&sz=64`}
        alt=""
        width="32"
        height="32"
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
      />
    </span>
  );
}
