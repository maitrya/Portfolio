// Re-mounts on every /work/* navigation so the entrance animation replays.
// Case pages have no position:fixed children, so the transform is safe here.
export default function WorkTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="page-enter">{children}</div>;
}
