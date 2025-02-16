import { Metadata } from 'next';
import { Suspense } from 'react';
import CustomersTable from '@/app/ui/customers/table';
import { fetchFilteredCustomers } from '@/app/lib/data';

export const metadata: Metadata = {
    title: 'Customers',
}

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '%'
    const formattedCustomers = await fetchFilteredCustomers(query);

    return (
        <div className="w-full">
            <Suspense>
                <CustomersTable customers={formattedCustomers} />
            </Suspense>
        </div>
    )
}