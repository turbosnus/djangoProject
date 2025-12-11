function Templates({ uuid, name, created_at }) {
	const date = new Date(created_at);

	return (
		<div className="w-full bg-white/5 hover:bg-white/7 rounded-lg p-3 flex flex-col gap-1 text-slate-200">
			<div className="flex items-center justify-between gap-2">
				<p className="font-semibold text-sm truncate">{name}</p>
				<span className="text-xs text-slate-400">{date.toLocaleDateString()}</span>
			</div>

			<p className="text-xs text-slate-400 break-words">
				UUID: <span className="font-mono text-xs text-slate-300">{uuid}</span>
			</p>
		</div>
	);
}

export { Templates };
