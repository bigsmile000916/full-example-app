import { faker } from '@faker-js/faker';
import { PlayIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { Keyboard, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Slide = {
  text: string;
  imageURL: string;
};

const ITEMS: Slide[] = [
  {
    imageURL: faker.image.abstract(800, 400, true),
    text: faker.lorem.lines(1),
  },
  {
    imageURL: faker.image.abstract(800, 400, true),
    text: faker.lorem.lines(1),
  },
  {
    imageURL: faker.image.abstract(800, 400, true),
    text: faker.lorem.lines(1),
  },
];

const TrendSlide = () => {
  const [items, setItems] = useState<Slide[]>();

  useEffect(() => {
    setItems(ITEMS);
  }, []);

  if (!items) {
    return null;
  }

  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Keyboard]}
        spaceBetween={50}
        navigation
        keyboard
        loop
        pagination={{
          clickable: true,
          el: '#pagination',
          bulletClass: 'w-2 h-2 rounded-full bg-slate-800',
          bulletActiveClass: '!bg-blue-500',
        }}
      >
        {items.map((item, i) => (
          <SwiperSlide
            key={i}
            className="aspect-[16/6] rounded-3xl relative flex items-center px-16 overflow-hidden"
          >
            <img
              src={item.imageURL}
              className="absolute inset-0 object object-cover object-center"
              alt=""
            />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-700"></div>
            <div className="relative">
              <h2 className="text-white font-bold text-2xl mb-4">
                {item.text}
              </h2>
              <div className="space-x-4 flex">
                <button className="font-bold flex items-center bg-white rounded-full py-2 px-5 text-blue-500 tracking-wide">
                  <span className="mr-2">読む</span>
                  <PlayIcon className="w-7 h-7 -mr-3" />
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        id="pagination"
        className="mt-6 flex justify-center mt-6 space-x-4"
      />
    </div>
  );
};

export default TrendSlide;
