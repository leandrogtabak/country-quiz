import QuizContainer from '../components/QuizContainer/QuizContainer';
import Layout from '../components/Layout/Layout';
import { useEffect, useState } from 'react';

export default function Home({ countries }) {
  // const [countries, setCountries] = useState([]);

  // useEffect(() => {
  //   const newCountries = [];
  //   for (const country of apiCountries) {
  //     newCountries.push({
  //       name: country.name,
  //       capital: country.capital,
  //       flag: country.flag,
  //     });
  //   }
  //   setCountries(newCountries);
  // }, []);

  return (
    <Layout>
      <QuizContainer countries={countries} />
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch('https://restcountries.com/v2/all');
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
}
