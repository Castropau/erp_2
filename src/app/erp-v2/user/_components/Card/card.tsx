import React from 'react';

interface CardProps {
    title: string,
    icon?: React.ReactNode,
    name: string
}

export default function Card(props: CardProps) {
    const { title, icon, name } = props;

    return (
        <div className="card p-3 rounded-lg shadow-md">
            <div className="flex justify-between">
                <h1 className="text-1xl font-bold text-gray-500 whitespace-nowrap h-11 flex items-center">
                    {title}
                </h1>
                <div></div>
            </div>
            <div className="flex items-end gap-2 mb-2">
                {icon && (
                    <p className="text-3xl">
                        {icon}
                    </p>
                )}
                <p className="text-1xl font-bold hover:underline cursor-pointer">
                    { name }
                </p>
            </div>
        </div>
    )
}
