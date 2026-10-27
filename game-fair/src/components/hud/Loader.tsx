export const Loader = ({ text = "טוען..." }: { text?: string }) => (
    <div className="fair-loader min-h-[50vh] w-full py-16">
        <span />
        <p className="text-lg">{text}</p>
    </div>
);
