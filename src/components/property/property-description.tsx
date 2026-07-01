interface PropertyDescriptionProps {
  description: string;
}

export function PropertyDescription({ description }: PropertyDescriptionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">About this place</h2>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}