(ns tetris.game
  (:require [tetris.input :as input]))

(defn get-tetrimoni [tetrimoni]
  (case tetrimoni
    :o [{:x 0 :y 0} {:x 0 :y 1} {:x 1 :y 0} {:x 1 :y 1}]
    :j [{:x 0 :y 2} {:x 1 :y 0} {:x 1 :y 1} {:x 1 :y 2}]
    :z [{:x 0 :y 2} {:x 0 :y 1} {:x 1 :y 0} {:x 1 :y 1}]
    :t [{:x 0 :y 1} {:x 1 :y 0} {:x 1 :y 1} {:x 1 :y 2}]
    :s [{:x 0 :y 2} {:x 1 :y 1} {:x 1 :y 2} {:x 0 :y 3}]
    :l [{:x 0 :y 0} {:x 1 :y 0} {:x 1 :y 1} {:x 1 :y 2}]
    :i [{:x 1 :y 0} {:x 1 :y 1} {:x 1 :y 2} {:x 1 :y 3}]))
