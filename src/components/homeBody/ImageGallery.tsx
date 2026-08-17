const ImageGallery = () => {
  return (
    <div className="hidden sm:block my-24 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center pb-12 space-y-2 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
          Botanical Living Gallery
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Inspiration from living plant corners styled by our community of plant lovers.
        </p>
        <div className="w-20 h-1 bg-[#81ba00] rounded-full mx-auto mt-2" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto max-w-full"
              src="https://soilplant-codezeel.myshopify.com/cdn/shop/files/category-img-1_380x424.jpg?v=1668771859"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://soilplant-codezeel.myshopify.com/cdn/shop/files/category-img-3_380x424.jpg?v=1668771859"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://soilplant-codezeel.myshopify.com/cdn/shop/products/4_2c630e12-2ece-4dab-bf48-f7c73868bd40_862x.jpg?v=1669028086"
              alt=""
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://soilplant-codezeel.myshopify.com/cdn/shop/files/category-img-2_380x424.jpg?v=1668771859"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://soilplant-codezeel.myshopify.com/cdn/shop/products/19_dcf28719-4fb7-43e5-b6ba-c5c622c0186c_862x.jpg?v=1669027211"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://soilplant-codezeel.myshopify.com/cdn/shop/articles/3_894x.jpg?v=1669007281"
              alt=""
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://soilplant-codezeel.myshopify.com/cdn/shop/products/12_4654fe90-3bb5-4bda-92d7-493f81b23e09_862x.jpg?v=1669027676"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://soilplant-codezeel.myshopify.com/cdn/shop/articles/5_894x.jpg?v=1669007345"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://soilplant-codezeel.myshopify.com/cdn/shop/articles/6_894x.jpg?v=1669007360"
              alt=""
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://soilplant-codezeel.myshopify.com/cdn/shop/files/category-img-2_380x424.jpg?v=1668771859"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://soilplant-codezeel.myshopify.com/cdn/shop/products/19_dcf28719-4fb7-43e5-b6ba-c5c622c0186c_862x.jpg?v=1669027211"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://soilplant-codezeel.myshopify.com/cdn/shop/articles/3_894x.jpg?v=1669007281"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
