<template>
  <ClientOnly>
    <div>
      <h2 class="text-2xl font-bold mb-4">Doações Entregues</h2>
      <apexchart
        :key="series"
        height="300"
        width="100%"
        :options="options"
        :series="series"
      ></apexchart>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="updateChart"
      >
        Change
      </button>
    </div>
  </ClientOnly>
  </template>
  <script setup lang="ts">
  const options = ref<any>({
    chart: {
      type: "area",
      zoom: {
        enabled: true
      }
    }
    
  });
  const series = ref<any>([{
            name: "Doações",
            data: []
          }]);
  const updateChart = () => {
    const data = [ 22, 25, 25, 25, 14 ]
  
    options.value = {
      ...options.value,
      xaxis: {
        categories: ["Jan", "Fev", "Mar", "Abr", "Mai"],
      },
      colors: ['#13a425']
    };
    series.value = [
      {
        name: "Doações",
        data: data,
      },
    ];
  };
  onMounted(() => {
    updateChart();
  });
  </script>
  
  