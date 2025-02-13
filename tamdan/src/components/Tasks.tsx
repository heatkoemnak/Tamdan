import Column from './Column';

export const Tasks = () => {
  return (
    <div className="max-w-5xl lg:mx-auto  mx-4 flex pt-24">
      <div className="grid gap-4 lg:mx-1 md:grid-cols-3 lg:grid-cols-3">
        <Column />
      </div>
    </div>
  );
};
