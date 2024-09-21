import Image from 'next/image';
import Image1 from '../../public/qrcode.png';

export default function QrCode() {
    return (
        <div className='h-full flex justify-center items-center'>
            <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-lg mt-28">
                <h1 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                    Veuillez imprimer le Qr Code
                </h1>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <Image
                        src={Image1}
                        alt="QR Code"
                        width={150}
                        height={150}
                        className="rounded-md"
                    />
                </div>
            </div>
        </div>
    );
}
