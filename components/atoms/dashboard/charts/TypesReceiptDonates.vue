<template>
  <div>
    <h4 class="text-2xl font-bold mb-4">Tipos Doações Recebidas - Nossa Senhora de Fátima - Vila Bonilha</h4>
    <apexchart
      :key="series"
      height="260"
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
  </template>
  <script setup lang="ts">
  const options = ref<any>({
    chart: {
      width: '100%',
      height: '100%',
      type: 'pie',
    },
    labels: ['Valor Monetário', 'Alimentos'],
    theme: {
      monochrome: {
        enabled: true,
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -5,
        },
      },
    },
    grid: {
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
    legend: {
      show: false
    }
  });
  const series = ref<any>([]);
  const labels = ref<any>([])
  const updateChart = () => {
  
    options.value = {
      ...options.value,
    }
    series.value = [ 18, 82 ];
    labels.value = ["Valor Monetério", "Alimentos"]
  };
  onMounted(() => {
    updateChart();
  });
  </script>
  
  