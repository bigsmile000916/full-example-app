import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
import { Keyboard, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
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
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Keyboard]}
          spaceBetween={50}
          keyboard
          loop
          navigation={{
            nextEl: '#next',
            prevEl: '#prev',
          }}
          pagination={{
            clickable: true,
            el: '#pagination',
            bulletClass: 'w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-800',
            bulletActiveClass: '!bg-blue-500',
          }}
        >
          {items.map((item, i) => (
            <SwiperSlide
              key={i}
              className="lg:aspect-[16/6] aspect-video rounded-3xl relative flex items-center px-4 lg:px-16 overflow-hidden"
            >
              <img
                src={item.imageURL}
                className="absolute inset-0 object object-cover object-center h-full w-full"
                alt=""
              />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-700"></div>
              <div className="relative">
                <h2 className="text-white font-bold text-xl lg:text-2xl">
                  {item.text}
                </h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          className="hidden lg:block absolute left-3 z-10 top-1/2 -translate-y-1/2"
          id="prev"
        >
          <ChevronLeftIcon className="w-10 h-10 text-slate-200" />
        </button>
        <button
          className="hidden lg:block absolute right-3 z-10 top-1/2 -translate-y-1/2"
          id="next"
        >
          <ChevronRightIcon className="w-10 h-10 text-slate-200" />
        </button>
      </div>
      <div id="pagination" className="mt-6 flex justify-center space-x-4" />
    </div>
  );
};

export default TrendSlide;
