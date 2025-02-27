'use client';
import { useEffect, useState } from 'react';
import { Button } from '@heroui/react';
import { FaShoppingCart, FaWarehouse, FaRegChartBar } from 'react-icons/fa';
import { IoDocumentSharp } from 'react-icons/io5';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f8ff]">
      <div className="container mx-auto px-4 py-10">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-[#007bff]">{greeting}, Welcome to Your Dashboard</h1>
          <p className="text-lg mt-4 text-gray-600">Your e-commerce management portal</p>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <FaShoppingCart size={40} color="#007bff" />
            <h3 className="mt-4 text-xl font-semibold">Purchase Orders</h3>
            <p className="text-sm text-gray-500 mt-2">Manage your purchase requests</p>
            <Link href="/purchase/order-request">
              <Button className="mt-4 bg-[#007bff] text-white hover:bg-[#0056b3]" size="lg">Go</Button>
            </Link>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <FaWarehouse size={40} color="#007bff" />
            <h3 className="mt-4 text-xl font-semibold">Warehouse Management</h3>
            <p className="text-sm text-gray-500 mt-2">Keep track of your stock</p>
            <Link href="/warehouse/requisition">
              <Button className="mt-4 bg-[#007bff] text-white hover:bg-[#0056b3]" size="lg">Go</Button>
            </Link>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <IoDocumentSharp size={40} color="#007bff" />
            <h3 className="mt-4 text-xl font-semibold">Sales Documents</h3>
            <p className="text-sm text-gray-500 mt-2">Manage your sales records</p>
            <Link href="/sale/booking">
              <Button className="mt-4 bg-[#007bff] text-white hover:bg-[#0056b3]" size="lg">Go</Button>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-[#007bff] text-center">Quick Stats</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <FaRegChartBar size={30} color="#007bff" />
              <h4 className="text-xl font-semibold mt-4">Sales Performance</h4>
              <p className="text-gray-500 mt-2">Track your sales progress</p>
              <Link href="/report/sales-performance">
                <Button className="mt-4 bg-[#007bff] text-white hover:bg-[#0056b3]" size="lg">View Report</Button>
              </Link>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <FaRegChartBar size={30} color="#007bff" />
              <h4 className="text-xl font-semibold mt-4">Order Requests</h4>
              <p className="text-gray-500 mt-2">View your order requests</p>
              <Link href="/report/order-request">
                <Button className="mt-4 bg-[#007bff] text-white hover:bg-[#0056b3]" size="lg">View Orders</Button>
              </Link>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <FaRegChartBar size={30} color="#007bff" />
              <h4 className="text-xl font-semibold mt-4">Expenses</h4>
              <p className="text-gray-500 mt-2">Manage your expenses</p>
              <Link href="/expenses/expense">
                <Button className="mt-4 bg-[#007bff] text-white hover:bg-[#0056b3]" size="lg">Manage</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
