import dedent from 'dedent';

interface CodeBlockProps {
  children: string;
}

export function CodeBlock({ children }: CodeBlockProps) {
  return (
    <pre className="mb-4 overflow-x-auto rounded-xl bg-zinc-900 p-4 text-sm text-zinc-100">
      <code>{dedent(children)}</code>
    </pre>
  );
}
