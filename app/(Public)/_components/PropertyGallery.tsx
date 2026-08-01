export default function PropertyGallery() {
    return (
        <div className="grid grid-cols-4 gap-4 h-[500px]">
            <img
                src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
                className="col-span-2 row-span-2 h-full w-full rounded-2xl object-cover"
            />

            {[1, 2, 3, 4].map((item) => (
                <img
                    key={item}
                    src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
                    className="h-full w-full rounded-2xl object-cover"
                />
            ))}
        </div>
    );
}