

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function SinglePropertyPage({ params }: Props) {
    const { id } = await params;

    return (
        <main className="container mx-auto py-10">
            <h1>Payment successfull {id}</h1>
        </main>
    );
}