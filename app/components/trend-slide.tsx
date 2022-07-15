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
        keyboard
        loop
        breakpoints={{
          768: {
            navigation: true,
          },
        }}
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
            className="md:aspect-[16/6] aspect-video rounded-3xl relative flex items-center px-4 md:px-16 overflow-hidden"
          >
            <img
              src={item.imageURL}
              className="absolute inset-0 object object-cover object-center"
              alt=""
            />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-700"></div>
            <div className="relative">
              <h2 className="text-white font-bold text-xl md:text-2xl mb-4">
                {item.text}
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div id="pagination" className="mt-6 flex justify-center space-x-4" />
    </div>
  );
};

export default TrendSlide;
